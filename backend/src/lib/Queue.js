import Bee from 'bee-queue';

import redisConfig from '../config/redis';

import DebtReminderMail from '../app/jobs/DebtReminderMail';

const jobs = [DebtReminderMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  /**
   * Initializing Queues
   * => Method for picking all imported jobs with its redis configuration, putting all into this.queues var
   */

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /**
   * Adding Jobs to Queue
   * => Method for adding new jobs in a specific queue passing its data
   */

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /**
   * Processing Queues
   * => Method for processing/executing queues
   */
  processQueue() {
    jobs.forEach(job => {
      // => Taking bee & handle from a job queue
      const { bee, handle } = this.queues[job.key];

      // => processing queue in real time passing its data
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
