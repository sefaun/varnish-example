vcl 4.1;

#Node.js - on port 5000
backend default {
  .host = "backend";
  .port = "5000";
  .connect_timeout = 10s;
  .first_byte_timeout = 2s;
  .between_bytes_timeout = 60s;
  .max_connections = 800;
}

sub vcl_deliver {
  if (obj.hits > 0) {
    set resp.http.X-Cache = "HIT";
    set resp.http.X-Cache-Hits = obj.hits;
  } else {
    set resp.http.X-Cache = "MISS";
    set resp.http.X-Cache-Hits = obj.hits;
  }

  if (resp.http.CR) {
    set resp.http.Content-Range = resp.http.CR;
    unset resp.http.CR;
  }

  return (deliver);
}

sub vcl_recv {
  if (req.http.Range ~ "bytes=") {
    set req.http.x-range = req.http.Range;
  }
}

sub vcl_hash {
  if (req.http.x-range ~ "bytes=") {
    hash_data(req.http.x-range);
    unset req.http.Range;
  }
}

sub vcl_backend_fetch {
  if (bereq.http.x-range) {
    set bereq.http.Range = bereq.http.x-range;
  }
}

sub vcl_backend_response {
  if (bereq.http.x-range ~ "bytes=" && beresp.status == 206) {
    set beresp.ttl = 10m;
    set beresp.http.CR = beresp.http.content-range;
  }
}