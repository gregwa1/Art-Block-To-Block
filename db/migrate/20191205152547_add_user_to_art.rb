class AddUserToArt < ActiveRecord::Migration[6.0]
  def change
    add_reference :arts, :user, null: false, foreign_key: true
  end
end
