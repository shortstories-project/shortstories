module Admin::Views::Stories
  class Show
    include Admin::View

    def cmd(story, command, class_name: '')
      form_for :story, routes.story_path(story.id), method: :patch do
        hidden_field :cmd, value: command

        submit(command.capitalize, class: class_name)
      end
    end
  end
end
