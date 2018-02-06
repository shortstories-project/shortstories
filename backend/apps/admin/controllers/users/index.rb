module Admin::Controllers::Users
  class Index
    include Admin::Action
    expose :users

    def call(_)
      @users = repo.all
    end

    private

    def repo
      UserRepository.new
    end
  end
end