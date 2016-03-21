class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :field_tests, :type, :test_type
  end
end
