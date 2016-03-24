class AddDrillByDateAndDrillToDepthToSites < ActiveRecord::Migration
  def change
    add_column :sites, :drill_to_depth, :float
    add_column :sites, :drill_by_date, :date
    drop_table :projects
  end
end
