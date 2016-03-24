class Site < ActiveRecord::Base
  has_many :drill_holes

  validates :site_name,
      presence: true
      
  validates :center_lat,
      presence: true

  validates :center_lng,
      presence: true


end
