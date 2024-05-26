export const LogDuration = () =>
  function (target: any, propertyKey: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const startTime = performance.now();

      if (!this.logger) {
        throw new Error("Logger is not defined");
      }

      try {
        const result = await originalMethod.apply(this, args);
        const duration = performance.now() - startTime;
        this.logger
          .getSubLogger({ name: `LogDuration:${target.constructor.name}` })
          .info(`${propertyKey} executed in ${Math.floor(duration)} ms`);

        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        this.logger
          .getSubLogger({ name: `LogDuration:${target.constructor.name}` })
          .error(`${propertyKey} executed in ${Math.floor(duration)} ms`);

        throw error;
      }
    };

    return descriptor;
  };
