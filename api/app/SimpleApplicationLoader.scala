import org.slf4j.LoggerFactory
import play.api.{Application, ApplicationLoader, LoggerConfigurator}
import play.api.ApplicationLoader.Context
import play.api.inject.guice.GuiceApplicationLoader

class SimpleApplicationLoader extends ApplicationLoader {

  val LOGGER = LoggerFactory.getLogger(getClass)

  override def load(context: Context): Application = {
    LOGGER.warn("start load")
    LoggerConfigurator(context.environment.classLoader).foreach {
      _.configure(context.environment)
    }
    LOGGER.warn("before end load")
    new GuiceApplicationLoader().load(context)
  }
}
