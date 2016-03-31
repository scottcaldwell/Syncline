class User < ActiveRecord::Base
  has_secure_password

  validates :email,
    presence: true

  validates :first_name,
      presence: true

  validates :last_name,
      presence: true

  scope :site_users, -> (site_id) do
    where(:id => SiteUser.where(site_id: site_id).pluck(:user_id))
  end

  def name
    first_name + ' ' + last_name
  end

end
