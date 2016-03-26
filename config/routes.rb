Syncline::Application.routes.draw do

  get "site_users/create"
  get "site_users/new"
  get "site_users/edit"
  get "site_users/destroy"
  resources :field_tests, only: [:new, :create, :update, :destroy]
  resources :lab_tests, only: [:new, :create, :update, :destroy]
  resources :sites, only: [:index, :show, :create] do
    resources :drill_holes do
      resources :layers
    end
    resources :projects, only: [:index]
  end

  resources :site_users, only: [:new, :create]
  resource :session, only: [:create, :destroy, :index, :new]
  resources :users, only: [:new, :show, :create, :edit, :destroy]

  get '/sites/:id/layers', to: 'layers#site_layers'
  get '/sites/:id/details', to: 'sites#details'
  put '/drill_hole/:id/update_reviewer', to: 'drill_holes#update_reviewer'
  put '/layers/sort', to: 'layers#sort'
  
  root to: 'sessions#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
