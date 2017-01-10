package controllers

import org.slf4j.LoggerFactory
import play.api.mvc.{Action, Controller}

class LogController extends Controller {

  val LOGGER = LoggerFactory.getLogger(getClass)

  def log(message: String) = Action {
    LOGGER.debug("log debug test: {}", message)
    LOGGER.info("log info test: {}", message)
    Ok
  }

}
