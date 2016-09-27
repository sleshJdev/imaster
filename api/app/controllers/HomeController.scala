package controllers

import play.api.mvc._

/**
  * @author slesh
  */
class HomeController extends Controller {

  def login = Action {
    Ok("login")
  }

}
