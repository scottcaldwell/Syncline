module ApplicationHelper

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def current_site
    session[:site_id]
  end

  def current_layer
    session[:layer_id]
  end

  def current_field_test
    session[:field_test_id]
  end

  def current_lab_test
    session[:lab_test_id]
  end

end
