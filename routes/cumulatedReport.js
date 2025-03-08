const express = require('express')
const router = express.Router()
const GpsPoint = require("../models/gpsPoint");
const Planned = require("../models/plannedRoute");
const z = require("zod");
const { spawn } = require('child_process');
const moment = require('moment');

// Default Test Report with no input date and no filtering
router.get('/', async (req, res) => {
  try {
  
    const [points, plan] = await Promise.all([
      GpsPoint.find().exec(),
      Planned.find().exec(),
    ]);

    const input = {
      points: points,
      plan: plan
    }
    const pythonResult = await runPythonScript('./python/Compare-Better-3.py', input);
    res.status(200).json(JSON.parse(pythonResult))

    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// With Input
router.get('/:date', async (req, res) => {
  try {
    //GpsArraySchema.parse(val);
    const date = moment(req.params.date);

     // Validate and parse the input date
     if (!moment(date).isValid()) {
      return res.status(400).send('Invalid date format. Please use YYYY-MM-DD.');
     }

    const startOfWeek = date.startOf('week').toDate();
    const endOfWeek = date.endOf('week').toDate();

    // Query the collection
    const results = await GpsPoint.find({
      $expr: {
          $and: [
              { $gte: [{ $dateFromString: { dateString: "$Data" } }, startOfWeek] },
              { $lt: [{ $dateFromString: { dateString: "$Data" } }, endOfWeek] }
          ]
      }
    });

    const plan = await Planned.find().exec();
    const input = {
      points: results,
      plan: plan
    }

    const pythonResult = await runPythonScript('./python/Compare-Better-3.py', input);

    res.status(200).json(JSON.parse(pythonResult))
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Function to run the Python script
function runPythonScript(script, inputData) {
  return new Promise((resolve, reject) => {
    // Spawn a child process to run the Python script
    const pythonProcess = spawn('python', [script], { stdio: ['pipe', 'pipe', 'pipe'] });

    // Handle Python script's stdout
    let outputData = '';
    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    // Handle Python script's stderr
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      reject(data.toString());
    });

    // Handle process exit
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(outputData);
      } else {
        reject(`Python script exited with code ${code}`);
      }
    });

    // Write the input data to the Python script's stdin
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();
  });
}

module.exports = router