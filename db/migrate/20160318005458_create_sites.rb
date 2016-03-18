class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.float :center_lat
      t.float :center_lng
      t.string :site_name

      t.timestamps
    end
  end
end
