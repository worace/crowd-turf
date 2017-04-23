require 'pg'

class DB
  URL ||= ENV['HEROKU_POSTGRESQL_BLACK_URL'] || "postgres://localhost/ground_game"
  CONN ||= PG.connect(URL)

  def initialize(query_files = [])
    @queries = {}
    query_files.each do |f|
      load_queries(f)
    end
  end

  def insert_pg_variables(query, arguments)
    arguments.each.with_index.reduce(query) do |query, (arg, index)|
      query.gsub(":#{arg}", "$#{index+1}")
    end
  end

  def query_components(query)
    header = /^-- name: (.*)\n/
    query_name = query.match(header)[1].to_sym
    raise "Must provide a header comment with query name" unless query_name

    body = query.sub(header, '')

    arguments = query.scan(/ :(.+)?;/).flatten.map(&:to_sym)
    {name: query_name,
     body: insert_pg_variables(body, arguments),
     arguments: arguments}
  end

  def read_queries(file)
    File.read(file).split("\n\n").map do |q|
      query_components(q)
    end
  end

  def load_queries(file)
    read_queries(file).each do |q|
      @queries[q[:name]] = q
    end
  end

  def execute(query_name, arguments = {})
    q = @queries[query_name]
    raise "no query #{query_name}" unless q
    params = q[:arguments].map { |a| arguments.fetch(a) }
    CONN.exec_params(q[:body], params).to_a
  end
end
