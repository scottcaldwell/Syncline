class UsersController < ApplicationController
  def show
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id # auto log in
      SiteUser.create(
      site_id: Site.find_by(site_name: "Syncline Headquarters").id,
      user_id: @user.id,
      admin: true
      )
      SiteUser.create(
      site_id: Site.find_by(site_name: "Lighthouse Labs").id,
      user_id: @user.id,
      admin: true
      )
      SiteUser.create(
      site_id: Site.find_by(site_name: "Science World").id,
      user_id: @user.id,
      admin: true
      )

      redirect_to sites_path
    else
      render :new
    end
  end

  def edit
  end

  def destroy
  end

  protected

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
  end
end
