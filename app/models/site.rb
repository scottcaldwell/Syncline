class Site < ActiveRecord::Base
  has_many :drill_holes, dependent: :destroy
  has_many :site_users, dependent: :destroy

  validates :site_name,
      presence: true

  validates :center_lat,
      presence: true, numericality: { greater_than_or_equal_to: -90, less_than_or_equal_to: 90 }

  validates :center_lng,
      presence: true, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }
end
