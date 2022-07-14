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

  return (deliver);
}