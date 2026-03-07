import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <StatusInfo />
    </>
  );
}

function StatusInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!data) {
    return <div>Erro ao carregar os dados.</div>;
  }

  const updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");

  return (
    <div>
      <div>
        <strong>Última Atualização:</strong> {updatedAtText}
      </div>

      <h2>Banco de Dados</h2>
      <div>
        <strong>Versão:</strong> {data.dependencies.database.version}
      </div>
      <div>
        <strong>Conexões Máximas:</strong>{" "}
        {data.dependencies.database.max_connections}
      </div>
      <div>
        <strong>Conexões Abertas:</strong>{" "}
        {data.dependencies.database.opened_connections}
      </div>
    </div>
  );
}
