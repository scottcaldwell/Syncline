class CreateSiteUsers < ActiveRecord::Migration
  def change
    create_table :site_users do |t|
      t.belongs_to :site, index: true
      t.belongs_to :user, index: true
      t.boolean :admin

      t.timestamps
    end
  end
end
