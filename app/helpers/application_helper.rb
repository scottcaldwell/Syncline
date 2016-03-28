module ApplicationHelper

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def current_site
    session[:site_id]
  end

  def require_logged_in_user
    unless current_user
      flash[:error] = "You must be logged in to see your sites"
      redirect_to root_path
    end
  end

  def is_a_site_user
    if SiteUser.where("user_id = ? AND site_id = ?", current_user.id, current_site).count < 1
      p "hello"
      flash[:error] = "You must be authorized to see this site"
      redirect_to root_path
    end
  end

end
