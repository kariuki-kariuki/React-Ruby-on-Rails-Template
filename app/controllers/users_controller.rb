class UsersController < ApplicationController

  skip_before_action :authorize, only: :create

  def create
    @user = User.create(user_params)
    if @user.valid?
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { jwt: token, exp: time.strftime('%m-%d-%Y %H:%M'),
                     username: @user.username, email: @user.email, role: @user.role }, status: :ok
    else
      render json: { errors: user.errors.full_message }
    end
  end

   def user_params
    params.permit(:username, :password, :password_confirmation, :email, :role)
  end
end
