const express = require('express')
const router = express.Router()
const GpsPoint = require("../models/gpsPoint");
const z = require("zod");
const { spawn } = require('child_process');

// Define the User schema
const GpsPointSchema = z.object({
  Nr: z.union([z.number(), z.string()]),
  Vehicul: z.string(),
  Data: z.string(),
  Pozitia: z.string(),
  Lat: z.string().optional(),
  Lng: z.string().optional(),
  'Stare heblu': z.string(),
  Viteza: z.string(),
  'Buton panica': z.string(),
  'Motor auxiliar': z.string(),
  'Motor cu perii': z.string(),
  'Pompa hidraulica': z.string(),
  'Nivel carburant': z.union([z.number(), z.string()]),
  AIN: z.string(),
  'Turatie sasiu': z.string(),
  'Index kilometri': z.string(),
  'Consum combustibil': z.string(),
  'Turatie auxiliar': z.string(),
  'Actionare frana': z.string(),
  'Actionare ambreiaj': z.string(),
  'Sistem auxiliar 1 Lichid': z.string(),
  'Sistem auxiliar 1 Solid': z.string(),
  'Sistem auxiliar 2 fara SA1': z.string(),
  'Sistem auxiliar 2 cu SA1': z.string(),
  'Sistem auxiliar 2 Total': z.string(),
  Can: z.string()
});

const GpsArraySchema = z.array(GpsPointSchema);

// Default Test Report with a certain date
router.get('/', async (req, res) => {
  try {
    res.status(500).json({ message: "Get Method with default value Not Implemented" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// With Input
router.post('/', async (req, res) => {
  let val = req.body;
  try {
    GpsArraySchema.parse(val);

    const pythonResult = await runPythonScript('./python/CumulateEffectuate.py', val);

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