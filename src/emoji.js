/* eslint-disable no-undef */
'use strict'

const search = require('./search')
const { getRandomSkinTone } = require('./utils')

// Modification: paste by default
// const pasteByDefault = getenv('snippetapp')
const pasteByDefault = true
const skinTone = getSkinTone()

function getenv (name) {
  if (typeof $ === 'undefined') return process.env[name]

  ObjC.import('stdlib')
  try {
    return $.getenv(name)
  } catch (e) {
    return null
  }
}

function getSkinTone () {
  const skinTone = getenv('skin_tone')

  if (skinTone === 'random') {
    return getRandomSkinTone()
  }

  return skinTone
}

// JXA: JavaScript for Automation Interface (`osascript -l JavaScript`)
// Note: In JXA, console.log writes to stderr instead of stdout
function run (argv) {
  const query = argv[0]

  const workflowPath = $.getenv('alfred_preferences') + '/workflows/' + $.getenv('alfred_workflow_uid') + '/'

  const found = search(query, skinTone, pasteByDefault, workflowPath)
  console.log(JSON.stringify(found))
}

module.exports = run

// Node.js Testing Interface
// IMPORTANT: keep this commented out unless manually testing
// run(process.argv.slice(2))
