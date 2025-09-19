package com.alugueldecarros.aluguel_de_carros.service;

import com.alugueldecarros.aluguel_de_carros.model.Cliente;
import com.alugueldecarros.aluguel_de_carros.model.PerfilUsuario;
import com.alugueldecarros.aluguel_de_carros.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Cliente criar(Cliente cliente) {
        validarCliente(cliente);
        cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));
        cliente.setPerfil(PerfilUsuario.CLIENTE);
        return clienteRepository.save(cliente);
    }

    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }

    public List<Cliente> buscarPorNome(String nome) {
        return clienteRepository.findByNameContainingIgnoreCase(nome);
    }

    public Optional<Cliente> buscarPorCpf(String cpf) {
        return clienteRepository.findByCpf(cpf);
    }

    public Optional<Cliente> buscarPorEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

    @Transactional
    public Cliente atualizar(Long id, Cliente clienteAtualizado) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        cliente.setName(clienteAtualizado.getName());
        cliente.setAdress(clienteAtualizado.getAdress());
        cliente.setEmail(clienteAtualizado.getEmail());
        cliente.setTelefone(clienteAtualizado.getTelefone());
        cliente.setProfissao(clienteAtualizado.getProfissao());
        if (clienteAtualizado.getSenha() != null && !clienteAtualizado.getSenha().isEmpty()) {
            cliente.setSenha(passwordEncoder.encode(clienteAtualizado.getSenha()));
        }
        return clienteRepository.save(cliente);
    }

    @Transactional
    public void excluir(Long id, PerfilUsuario perfilUsuario) {
        if (perfilUsuario != PerfilUsuario.ADMIN) {
            throw new RuntimeException("Apenas administradores podem excluir clientes.");
        }
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        clienteRepository.delete(cliente);
    }

    private void validarCliente(Cliente cliente) {
        if (clienteRepository.findByCpf(cliente.getCpf()).isPresent()) {
            throw new RuntimeException("CPF já cadastrado.");
        }
        if (!validarCpf(cliente.getCpf())) {
            throw new RuntimeException("CPF inválido.");
        }
        if (!validarRg(cliente.getRg())) {
            throw new RuntimeException("RG inválido.");
        }
        if (!cliente.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new RuntimeException("E-mail inválido.");
        }
        if (cliente.getSenha() == null || cliente.getSenha().isEmpty()) {
            throw new RuntimeException("Senha obrigatória.");
        }
    }

    private boolean validarCpf(String cpf) {
        return cpf != null && cpf.matches("\\d{11}");
    }

    private boolean validarRg(String rg) {
        return rg != null && rg.matches("\\d{7,9}");
    }
}
