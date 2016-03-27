class SiteUsersController < ApplicationController

  def create
    if User.find_by(email: site_user_params[:email]) == nil
      redirect_to "/sites/#{session[:site_id]}", notice: "User couldn't be found, have they signed up yet?"
    else
      @user_id = User.find_by(email: site_user_params[:email]).id
      SiteUser.create(site_id: session[:site_id], user_id: @user_id, admin: true)
      redirect_to "/sites/#{session[:site_id]}", notice: "User successfully added."
    end
  end

  def new
  end

  def edit
  end

  def destroy
  end

  protected

  def site_user_params
    params.require(:user).permit(:email)
  end

end
