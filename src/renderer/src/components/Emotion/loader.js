import { Source } from './Source'

/*Prevents globalThis being reported as an error by eslint*/
/*global globalThis*/

// Singleton
let aiSdkInstance
let source

async function downloadAiSdk() {
  if (globalThis.CY) {
    throw new Error('AI-SDK has already been downloaded.')
  }
}

async function initAiSdk() {
  if (aiSdkInstance) {
    throw new Error('An instance of the AI-SDK is already running.')
  }
  source = new Source()

  aiSdkInstance = await globalThis.CY.loader()
    .licenseKey('sk00b96a7fb46ff94ba8087f026af38e581afe668f7f0e')
    .source(source)
    .addModule(globalThis.CY.modules().FACE_DETECTOR.name)
    .addModule(globalThis.CY.modules().FACE_EMOTION.name, {
      enableBalancer: false,
      smoothness: 0.5
    })
    .addModule(globalThis.CY.modules().FACE_GENDER.name, {})
    .addModule(globalThis.CY.modules().FACE_AGE.name, {
      windowSizeMs: 4000,
      maxVarianceCutoff: Math.pow(7, 2),
      numericalStability: 1
    })
    .addModule(globalThis.CY.modules().FACE_FEATURES.name, {})
    .addModule(globalThis.CY.modules().FACE_POSITIVITY.name, {})
    .addModule(globalThis.CY.modules().FACE_POSE.name, {})
    .addModule(globalThis.CY.modules().FACE_AROUSAL_VALENCE.name, {
      smoothness: 0.9
    })
    .addModule(globalThis.CY.modules().FACE_ATTENTION.name, {})
    .addModule(globalThis.CY.modules().DATA_AGGREGATOR.name, {})
    .load()
}

/**
 * Loads the MorphCast SDK, only the first time, then returns the controls for the start / stop
 *
 * @returns {Promise<{getModule: *, stop: *, CY: *, start: *, source: *}>}
 */
export async function getAiSdkControls() {
  if (globalThis.CY === undefined) {
    await downloadAiSdk()
  }
  if (aiSdkInstance === undefined) {
    await initAiSdk()
  }

  const { start, stop, getModule } = aiSdkInstance
  return { start, stop, getModule, source, CY: globalThis.CY }
}
