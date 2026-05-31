import { BottomNav } from "../components/BottomNav";

export function MessagesPage({
  user,
  conversations,
  activeConv, setActiveConv,
  messages,
  newMsg, setNewMsg,
  sendMessage,
  getOtherName,
  goToAnnonce,
  messagesEndRef,
  unreadCount,
  page, setPage,
  catActive, setCat,
  favoris,
  Header,
  Footer,
  OfflineBanner,
  Toast,
}) {
  return (<>
    <OfflineBanner/><Toast/>
    <div className="app"><Header/>
      {!activeConv ? (
        // Liste des conversations
        <div className="chat-list-wrap">
          <div className="stitle" style={{marginTop:0}}>Mes messages</div>
          {conversations.length === 0
            ? <div className="empty">
                <div className="emsg">Aucune conversation</div>
                <div className="esub">Contactez un vendeur pour démarrer</div>
              </div>
            : <div style={{background:"var(--bg2)",borderRadius:20,border:"1px solid var(--border2)",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,.3)"}}>
                {conversations.map(conv => {
                  const hasUnread = conv.lastSenderId !== user.uid && !conv[`read_${user.uid}`];
                  return (
                    <div key={conv.id} className="conv-item" onClick={()=>{ setActiveConv({...conv, [`read_${user.uid}`]: true}); }}>
                      <div className="conv-avatar">{getOtherName(conv)?.[0]?.toUpperCase()||"?"}</div>
                      <div className="conv-info">
                        <div className="conv-name" style={hasUnread?{fontWeight:900}:{}}>{getOtherName(conv)}</div>
                        <div className="conv-annonce">{conv.annonceTitre}</div>
                        <div className="conv-last" style={hasUnread?{color:"var(--dark)",fontWeight:700}:{}}>{conv.lastMessage || "Démarrer la conversation"}</div>
                      </div>
                      {hasUnread && <div className="conv-unread">!</div>}
                    </div>
                  );
                })}
              </div>
          }
        </div>
      ) : (
        // Chat room
        <div className="chatroom">
          <div className="chatroom-header">
            <button className="chatroom-back" onClick={()=>setActiveConv(null)}>←</button>
            <div className="conv-avatar" style={{width:38,height:38,fontSize:16}}>{getOtherName(activeConv)?.[0]||"?"}</div>
            <div className="chatroom-info">
              <h3>{getOtherName(activeConv)}</h3>
              <button
                className="chatroom-annonce-link"
                onClick={() => goToAnnonce(activeConv.annonceId)}
                title="Voir l'annonce"
              >
                {activeConv.annonceTitre} <span className="chatroom-annonce-arrow">→</span>
              </button>
            </div>
          </div>
          <div className="chatroom-messages">
            {messages.length === 0 && <div className="empty"><div className="emsg">Démarrez la conversation !</div></div>}
            {messages.map(m => (
              <div key={m.id} className={`msg ${m.senderId===user.uid?"mine":"theirs"}`}>
                <div className="msg-bubble">{m.text}</div>
                <div className="msg-time">{m.createdAt?.toDate ? new Date(m.createdAt.toDate()).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) : ""}</div>
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>
          <div className="chatroom-input">
            <input placeholder="Votre message..." value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()}/>
            <button className="send-btn" onClick={sendMessage}>→</button>
          </div>
        </div>
      )}
      <BottomNav page={page} setPage={setPage} catActive={catActive} setCat={setCat} favoris={favoris} unread={unreadCount}/>
      <Footer/>
    </div>
  </>);
}
