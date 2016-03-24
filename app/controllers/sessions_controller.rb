class SessionsController < ApplicationController
  include ApplicationHelper

  before_filter :disable_nav, only: [:index]

  def new
  end

  def index
    if current_user
      redirect_to sites_path
    end
  end

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to sites_path
    else
      flash.now[:alert] = "Log in failed..."
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "Adios!"
  end

end
