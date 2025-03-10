<script>
    // Import any necessary dependencies
    import { onMount } from 'svelte';
    
    // Get access to the news entries from the parent component
    // You can either pass them as a prop or access from a store
    export let entradas = [];
    
    let message = "";
    let chatHistory = [];
    let isLoading = false;
    let selectedEntradas = [];
    
    function toggleEntradaSelection(id) {
      if (selectedEntradas.includes(id)) {
        selectedEntradas = selectedEntradas.filter(entradaId => entradaId !== id);
      } else {
        selectedEntradas = [...selectedEntradas, id];
      }
    }
    
    function getSelectedEntradas() {
      return entradas.filter(entrada => selectedEntradas.includes(entrada.id));
    }
  
    async function sendMessage() {
      if (!message.trim()) return;
  
      const userMessage = { role: "user", content: message };
      chatHistory = [...chatHistory, userMessage];
      isLoading = true;
  
      try {
        // Create context from selected news entries
        const selectedContextData = getSelectedEntradas();
        const contextString = selectedContextData.length > 0 
          ? `Contexto de noticias: ${selectedContextData.map(e => `${e.titulo}: ${e.contenido}`).join(' | ')}`
          : '';
        
        // Combine user message with context
        const fullMessage = contextString 
          ? `${message}\n\nContexto: ${contextString}`
          : message;
  
        const response = await fetch("http://localhost:5000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: fullMessage })
        });
  
        if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);
  
        const data = await response.json();
        chatHistory = [...chatHistory, { role: "assistant", content: data.response }];
        
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
        chatHistory = [...chatHistory, { 
          role: "assistant", 
          content: "⚠️ Error: No se pudo obtener una respuesta del servidor." 
        }];
      } finally {
        isLoading = false;
        message = "";
      }
    }
  
    function handleKeydown(event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    }
  </script>
  
  <div class="chat-container">
    <h2 class="chat-title">¡Chatea con Luci!</h2>
    
    <!-- Context selector -->
    <div class="context-container">
      <h4>Selecciona los temas de tu interés</h4>
      <div class="context-items">
        {#each entradas as entrada}
          <div 
            class="context-item {selectedEntradas.includes(entrada.id) ? 'selected' : ''}"
            on:click={() => toggleEntradaSelection(entrada.id)}
          >
            <span class="context-icon">📄</span>
            {entrada.titulo}
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Chat history -->
    <div class="chat-box">
        {#each chatHistory as msg}
          <div class="message {msg.role}">
            <div class="avatar">
              {#if msg.role === "user"}
                👤
              {:else}
                <img src="assets/Luci.png" width="50" height="50" alt="Luci"/>
              {/if}
            </div>
            <div class="content">{msg.content}</div>
          </div>
        {/each}
        {#if isLoading}
          <div class="message assistant loading">
            <div class="avatar"><img src="assets/Luci.png" width="50" height="50" alt="Luci"/></div>
            <div class="content">
              <div class="loading-indicator">
                <img src="assets/Luci-Typing.png" alt="Cargando..." class="loading-img" />
                <div class="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    
    <!-- Input area -->
    <div class="input-container">
      <input 
        bind:value={message} 
        on:keydown={handleKeydown} 
        placeholder="Escribe tu mensaje..." 
        class="message-input"
      />
      <button on:click={sendMessage} class="send-button">
        {isLoading ? '...' : '↑'}
      </button>
    </div>
  </div>
  
  <style>
    .chat-container {
      width: 25%;
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      gap: 15px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      padding: 20px;
      background: #f9f9f9;
    }
    
    .chat-title {
      text-align: center;
      margin: 0 0 10px 0;
      color: var(--dark-blu, #2c3e50);
      font-weight: 600;
    }
    
    .chat-box {
      height: 320px;
      overflow-y: auto;
      border-radius: 8px;
      background: white;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
    }
    
    .message {
      display: flex;
      margin-bottom: 8px;
      max-width: 90%;
    }
    
    .user {
      align-self: flex-end;
      flex-direction: row-reverse;
      margin-left: auto;
    }
    
    .assistant {
      align-self: flex-start;
      margin-right: auto;
    }
    
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      margin: 0 8px;
    }
    
    .content {
      padding: 10px 14px;
      border-radius: 18px;
      max-width: 270px;
      word-break: break-word;
    }
    
    .user .content {
      background: var(--weird-blu, #3498db);
      color: white;
      border-top-right-radius: 4px;
    }
    
    .assistant .content {
      background: #e9e9eb;
      color: #333;
      border-top-left-radius: 4px;
    }
    
    .loading-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .loading-img {
      border-radius: 8px;
      margin-bottom: 8px;
      width: 90px;
      height: 90px;
      background: #eee;
    }
    
    .typing-dots {
      display: flex;
      gap: 4px;
      margin-top: 4px;
    }
    
    .typing-dots span {
      width: 8px;
      height: 8px;
      background: #999;
      border-radius: 50%;
      display: inline-block;
      animation: pulse 1.5s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .typing-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.2); opacity: 1; }
    }
    
    .input-container {
      display: flex;
      gap: 8px;
    }
    
    .message-input {
      flex: 1;
      padding: 12px 16px;
      border-radius: 24px;
      border: 1px solid #ddd;
      outline: none;
      font-size: 14px;
      transition: border-color 0.2s;
    }
    
    .message-input:focus {
      border-color: var(--weird-blu, #3498db);
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
    }
    
    .send-button {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--weird-blu, #3498db);
      color: white;
      border: none;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    
    .send-button:hover {
      background: var(--dark-blu, #2c3e50);
    }
    
    .context-container {
      background: #f0f0f0;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 10px;
      max-height: 200px;
      overflow-y: auto;
    }
    
    .context-container h4 {
      margin: 0 0 8px 0;
      font-size: 14px;
      color: #555;
    }
    
    .context-items {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    .context-item {
      background: white;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid #ddd;
      font-size: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s;
    }
    
    .context-item:hover {
      background: #f5f5f5;
    }
    
    .context-item.selected {
      background: #e1f0ff;
      border-color: var(--weird-blu, #3498db);
      color: var(--dark-blu, #2c3e50);
    }
    
    .context-icon {
      font-size: 14px;
    }
  </style>