task :default => :web

desc "Compile pl0.pegjs browser version"
task :web do
  sh "pegjs -e pl0 views/pl0.pegjs public/javascipt/pl0.js"
end

desc "Remove pl0.pegjs"
task :clean do
  sh "rm -f public/pl0.js"
end

desc "Compileviews//styles.scss into public/css/styles.css using sass"
task :sass do
  sh "sass  views/styles.scss public/css/styles.css"
end

desc "tests"
task :test do
  puts "Not implemented (yet)"
end
task :pg do
  sh "pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start"
end

task :stoppg do
  sh "pg_ctl -D /usr/local/var/postgres stop -s -m fast"
end
