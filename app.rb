class App < Sinatra::Base
  enable :sessions

  use OmniAuth::Builder do
    provider :steam, '7086038880F2FF8DEA78BB990C3FCB3C'
  end

  helpers do
    def member?
      session[:member]
    end
  end

  get '/public' do
    "This is the public page - everybody is welcome!"
  end

  get '/private' do
    halt(401,'Not Authorized') unless member?
    "This is the private page - members only"
  end

  get '/login/:login_provider' do |login_provider|
    redirect to("/auth/steam") if session[:member] == nil && login_provider == 'steam'
    session[:member] = true
    redirect back
  end

  post '/auth/steam/callback' do
    env['omniauth.auth'] ? session[:member] = true : halt(401,'Not Authorized')
    if User.first(login_key: env['omniauth.auth']['uid']).nil?
      User.create(name: env['omniauth.auth']['info']['nickname'], admin: 'f', login_provider: 'Steam', login_key: env['omniauth.auth']['uid'])
    end
    session[:name] = env['omniauth.auth']['info']['nickname']
    session[:login_key] = env['omniauth.auth']['uid']
    redirect '/login/steam'
  end

  get '/auth/failure' do
    params[:message]
  end

  get '/logout' do
    session.clear
    redirect back
  end

  get '/' do
    redirect '/browse'
  end

  get '/room/:url' do |url|
    @room = Room.first(:url => url) #hämtar informationen om rummet
    @roomusers = RoomUser.all(room_id: @room.id) #hämtar id på alla som har checkat in i det rummet.
    @users = @room.user
    @name = session[:name]
    p session[:member]
    slim :room
  end

  get '/create' do
    slim :create

  end
  post '/createroom' do
    Room.create(url: rand(36**10).to_s(36), name: params['groupname'],#skapar ett slumpmässigt token som URL
                size: params['size'], public: params['publicity'],
                game: params['game'], language: params['language'])
    newroom = Room.first(name: params['groupname'])
    redirect "room/#{newroom.url}"
  end
  get '/browse' do
    @rooms = Room.all
    slim :browse

  end
  post '/checkin' do
    @room = Room.first(id: params['id'])

    if @room.user.length < @room.size
      time = params['hour'] + ':' + params['minute']
      User.create(name: params['name'],admin: 'false', login_provider: "", login_key: "", )
      @createduser = User.first(:name => params['name'])
      RoomUser.create(room_id: params['id'], user_id: @createduser.id,leader: TRUE, ready_until: time)
      redirect back
    else redirect '/error'

    end
  end

  post '/remove_checkin' do

  end

  error do
    raise "ERROR!!!!!!"
  end

end