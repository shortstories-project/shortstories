Hanami::Model.migration do
  change do
    drop_column :users, :github_id

    add_column :users, :avatar, String, text: true
  end
end
