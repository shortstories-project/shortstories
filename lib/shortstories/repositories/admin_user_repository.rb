class AdminUserRepository < Hanami::Repository
  def find_by_email(email)
    admin_users
      .where(email: email)
      .as(AdminUser)
      .one
  end
end
