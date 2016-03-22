class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.float :drill_to_depth
      t.date :drill_by_date
      t.belongs_to :site, index: true

      t.timestamps
    end
  end
end
