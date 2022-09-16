class SessionsController < ApplicationController

  skip_before_action :authorize, only: :create

  def show
    render json: @current_user, status: :ok
  end

  def create
    @user = User.find_by_username(params[:username])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { jwt: token, exp: time.strftime('%m-%d-%Y %H:%M'),
                     name: @user.username, email: @user.email, role: @user.role }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
end
