class PdfMailer < ApplicationMailer
  default from: 'notifications@syncline.com'

  def email_pdf(pdf, drill_hole, user_id)
    @user = User.find(user_id)
    @pdf = pdf
    @drill_hole = drill_hole
    @url  = 'http://syncline.herokuapp.com/'
    attachments["#{@drill_hole.name}-logs.pdf"] = pdf if pdf.present?
    mail(to: @user.email, subject: "Drill Hole Logs for #{@drill_hole.name}.")
  end
end
