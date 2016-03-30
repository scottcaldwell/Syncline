class DrillHole < ActiveRecord::Base

  default_scope { order('id') }

  belongs_to :site
  has_many :layers

  validates :site_id,
    presence: true
  validates :logged_by,
    presence: true
  validates :logged_by_id,
    presence: true
  validates :name,
    presence: true
  validates :depth,
    presence: true
  validates :ground_elev,
    presence: true
  validates :dh_lat,
      presence: true, numericality: { greater_than_or_equal_to: -90, less_than_or_equal_to: 90 }
  validates :dh_lng,
      presence: true, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }

  validate :check_logged_by_and_reviewed_by

  def check_logged_by_and_reviewed_by
    errors.add(:reviewed_by, "can't be the same as logger") if logged_by_id == reviewed_by_id
  end
end
