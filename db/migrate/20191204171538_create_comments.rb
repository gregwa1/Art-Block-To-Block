class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :username
      t.string :art_name
      t.text :description

      t.timestamps
    end
  end
end
