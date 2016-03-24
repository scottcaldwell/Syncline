class UserMailer < ApplicationMailer

  default from: 'notifications@syncline.com'
   
  def welcome_email(user)
    @user = user
    @url  = 'http://syncline.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

  def destroy_email(user)
    @user = user
    @url  = 'http://syncline.com/login'
    mail(to: @user.email, subject: 'You have been removed from My Awesome Site')
  end

end