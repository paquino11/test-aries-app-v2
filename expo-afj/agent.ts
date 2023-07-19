import type { InitConfig } from '@aries-framework/core'
import { Agent } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/react-native'
import { HttpOutboundTransport, WsOutboundTransport } from '@aries-framework/core'
import { AskarModule } from '@aries-framework/askar'
import { ariesAskar } from '@hyperledger/aries-askar-react-native'
import {
  ConnectionEventTypes,
  ConnectionStateChangedEvent,
  DidExchangeState,
  OutOfBandRecord,
  ConnectionsModule,
} from '@aries-framework/core'
import { HttpInboundTransport } from '@aries-framework/node'

const config: InitConfig = {
  label: 'docs-agent-react-native',
  walletConfig: {
    id: 'wallet-id',
    key: 'testkey0000000000000000000000000',
  },
  endpoints: ['http://localhost:3001'],
}

const agent = new Agent({
  config,
  modules: {
    askar: new AskarModule({ ariesAskar }),
    connections: new ConnectionsModule({ autoAcceptConnections: true }),
  },
  dependencies: agentDependencies,
})

const createNewInvitation = async (agent: Agent) => {
    const outOfBandRecord = await agent.oob.createInvitation()

    return {
        invitationUrl: outOfBandRecord.outOfBandInvitation.toUrl({ domain: 'https://example.org' }),
        outOfBandRecord,
  }
}

const setupConnectionListener = (agent: Agent, outOfBandRecord: OutOfBandRecord, cb: (...args: any) => void) => {
  agent.events.on<ConnectionStateChangedEvent>(ConnectionEventTypes.ConnectionStateChanged, ({ payload }) => {
    if (payload.connectionRecord.outOfBandId !== outOfBandRecord.id) return
    if (payload.connectionRecord.state === DidExchangeState.Completed) {
      // the connection is now ready for usage in other protocols!
      console.log(`Connection for out-of-band id ${outOfBandRecord.id} completed`)

      // Custom business logic can be included here
      // In this example we can send a basic message to the connection, but
      // anything is possible
      cb()

      // We exit the flow
      process.exit(0)
    }
  })
}


// Register a simple `WebSocket` outbound transport
agent.registerOutboundTransport(new WsOutboundTransport())

// Register a simple `Http` outbound transport
agent.registerOutboundTransport(new HttpOutboundTransport())

// Register a simple `Http` inbound transport
//agent.registerInboundTransport(new HttpInboundTransport({ port: 3001 }))

export { agent, createNewInvitation, setupConnectionListener };


