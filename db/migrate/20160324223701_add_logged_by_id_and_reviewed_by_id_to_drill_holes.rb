class AddLoggedByIdAndReviewedByIdToDrillHoles < ActiveRecord::Migration
  def change
    add_column :drill_holes, :logged_by_id, :integer
    add_column :drill_holes, :reviewed_by_id, :integer
  end
end
