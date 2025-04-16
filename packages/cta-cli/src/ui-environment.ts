import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  outro,
  spinner,
} from '@clack/prompts'
import chalk from 'chalk'

import { createDefaultEnvironment } from '@tanstack/cta-engine'

import type { Environment } from '@tanstack/cta-engine'

export function createUIEnvironment(
  appName: string,
  silent: boolean,
): Environment {
  const defaultEnvironment = createDefaultEnvironment()

  let newEnvironment = {
    ...defaultEnvironment,
    appName,
  }

  if (!silent) {
    newEnvironment = {
      ...newEnvironment,
      intro: (message: string) => {
        intro(message)
      },
      outro: (message: string) => {
        outro(message)
      },
      info: (title?: string, message?: string) => {
        log.info(
          `${title ? chalk.red(title) : ''}${message ? chalk.green(message) : ''}`,
        )
      },
      error: (title?: string, message?: string) => {
        log.error(`${title ? `${title}: ` : ''}${message}`)
      },
      warn: (title?: string, message?: string) => {
        log.warn(`${title ? `${title}: ` : ''}${message}`)
      },
      confirm: async (message: string) => {
        const shouldContinue = await confirm({
          message,
        })
        if (isCancel(shouldContinue)) {
          cancel('Operation cancelled.')
          process.exit(0)
        }
        return shouldContinue
      },
      spinner: () => {
        const s = spinner()
        return {
          start: (message: string) => {
            s.start(message)
          },
          stop: (message: string) => {
            s.stop(message)
          },
        }
      },
    }
  }

  return newEnvironment
}
