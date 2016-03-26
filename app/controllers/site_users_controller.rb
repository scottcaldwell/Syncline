class SiteUsersController < ApplicationController

  def create
    
    @user_id = User.find_by(email: params[:email]).id
  end

  def new
  end

  def edit
  end

  def destroy
  end

  protected

  def site_user_params
    params.require(:site_user).permit(:email)
  end

end
