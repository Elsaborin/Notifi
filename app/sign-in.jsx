"use client"

import { router } from "expo-router"
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"
import { useState } from "react"
import { useSession } from "../utils/ctx"
import { StatusBar } from "expo-status-bar"

export default function SignIn() {
  const { signIn } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, rellena todos los campos")
      return
    }

    setLoading(true)
    setError("")

    const result = await signIn(email, password)
    setLoading(false)

    if (result.success) {
      router.replace("/")
    } else {
      setError(result.error)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1E293B" />
      <View style={styles.form}>
        <Text style={styles.title}>Expo notifications</Text>
        <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
          placeholderTextColor="#94A3B8"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          editable={!loading}
          placeholderTextColor="#94A3B8"
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={[styles.button, loading && styles.buttonDisabled]}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Iniciar sesión</Text>}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
  },
  form: {
    padding: 24,
    margin: 16,
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 32,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  input: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    fontSize: 16,
    color: "#334155",
  },
  button: {
    backgroundColor: "#0284C7",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#0284C7",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: "#7DD3FC",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  error: {
    color: "#EF4444",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
})

