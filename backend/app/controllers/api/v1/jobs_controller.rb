class Api::V1::JobsController < ApplicationController
  # GET /api/v1/jobs
  def index
    render json: Job.all
  end

  # GET /api/v1/jobs/1
  def show
    render json: Job.find(params[:id])
  end
  
  # POST /api/v1/jobs
  def create
    job = Job.new(job_params)
    
    if job.save
      render json: job, status: :created
    else
      render json: job.errors, status: :unprocessable_entity
    end
  end
  
  # DELETE /api/v1/jobs/1
  def destroy
    Job.destroy(params[:id])
  end
  
  # PATCH/PUT /api/v1/jobs/1
  def update
    job = Job.find(params[:id])
    if job.update(job_params)
      render json: job, status: :ok
    else
      render json: job.errors, status: :unprocessable_entity
    end
  end

  # GET /api/v1/approvedjobs
  def approved
    render json: Job.where(approved: true)
  end

  # GET /api/v1/notapprovedjobs
  def notapproved
    render json: Job.where(approved: false)
  end
  
  private
  
  def job_params
    params.require(:job).permit(:identifier, :poster, :description, :start_date, :end_date, :location, :approved)
  end
end