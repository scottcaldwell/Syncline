class DrillHole < ActiveRecord::Base
  belongs_to :site
  has_many :layers

  validates :site_id,
    presence: true
end
