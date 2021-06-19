class Api::V1::UsersController < ApplicationController
  def index
    user = User.all
    if user
      render json: User.all
    else
      render json: user.errors, status: :not_found
    end
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: user, status: :created
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    User.destroy(params[:id])
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user, status: :ok
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email,:password,:is_admin)
  end
end