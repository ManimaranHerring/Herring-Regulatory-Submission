CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID,
  product_id UUID,
  application_number TEXT,
  region TEXT NOT NULL,
  format TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE sequences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES applications(id),
  sequence_number TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  validation_status TEXT DEFAULT 'not_run',
  created_at TIMESTAMPTZ DEFAULT now()
);
