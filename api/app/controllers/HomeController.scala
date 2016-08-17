package controllers

import play.api.mvc._

/**
  * @author slesh
  */
class HomeController extends Controller {

  def index = Action {
    Ok("Hello")
  }

}
