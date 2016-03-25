class UserMailer < ApplicationMailer

  default from: 'notifications@syncline.com'
   
  def welcome_email(user)
    @user = user
    @url  = 'http://syncline.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

  def review_email(user_id, drill_hole)
    @user = User.find(user_id);
    @drill_hole = drill_hole
    @url  = 'http://syncline.com/login'
    mail(to: @user.email, subject: "#{@drill_hole.name} has been reviewed")
  end

end